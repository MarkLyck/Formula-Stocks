import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useQuery, useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import { FILE_STACK_INFO, FILE_CREATE_MUTATION } from '~/common/queries'
import LatestUploads from './LatestUploads'
const { Dragger } = Upload

const APIContainer = styled.div`
  padding: 48px;
`

const StyledDragger = styled(Dragger)`
  padding: 64px;
`

function isValidJSON(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const readFile = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = (error) => reject(error)
  })

const customRequest = async (data: any) => {
  data.onProgress({ percent: 10 })
  const jsonString: any = await readFile(data.file)
  const valid = isValidJSON(jsonString)
  if (!valid) {
    message.error(`${data.file.name} Invalid JSON!`, 120)
    Promise.reject('Invalid JSON')
  } else {
    return fetch(data.action, {
      method: 'POST',
      body: data.file,
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => {
        data.onProgress({ percent: 90 })
        return response.json()
      })
      .then((response) => {
        console.log('response', response)
        data.onSuccess(response)
      })
      .catch((err) => {
        data.onError(err)
        console.error('err', err)
      })
  }
}

const Uploader = () => {
  const { loading, error, data: fileStackData } = useQuery(FILE_STACK_INFO)
  const [fileCreateMutation] = useMutation(FILE_CREATE_MUTATION)

  if (loading || error || !fileStackData) return ''

  const FILESTACK_API_KEY = fileStackData.fileUploadInfo.apiKey
  const FILESTACK_SIGNATURE = fileStackData.fileUploadInfo.signature
  const FILESTACK_POLICY = fileStackData.fileUploadInfo.policy
  const FILESTACK_PATH = fileStackData.fileUploadInfo.path
  const FILE_STACK_URL = `https://www.filestackapi.com/api/store/S3?key=${FILESTACK_API_KEY}&policy=${FILESTACK_POLICY}&signature=${FILESTACK_SIGNATURE}&path=${FILESTACK_PATH}`

  const handleChange = (info: any) => {
    const { status } = info.file

    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }

    if (status === 'done' && info.file.response.url) {
      // run MUTATION TO ADD TO 8BASE
      const urlList = info.file.response.url.split('/')
      const fileId = urlList[urlList.length - 1]

      fileCreateMutation({
        variables: {
          fileId,
          fileName: info.file.name,
        },
      })

      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  return (
    <APIContainer>
      <StyledDragger
        name="file"
        multiple
        accept=".json"
        headers={{ 'Content-type': 'application/json' }}
        action={FILE_STACK_URL}
        onChange={handleChange}
        customRequest={customRequest}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click to browse or drag .json file to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
      </StyledDragger>
      <LatestUploads />
    </APIContainer>
  )
}

export default Uploader
