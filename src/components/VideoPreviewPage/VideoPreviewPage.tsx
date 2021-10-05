import { useMemo } from 'react'
import styles from './VideoPreviewPage.module.css'
import { useSelector, useDispatch } from 'react-redux'
import JobService from '../../service/job-service'
import ProfileService from '../../service/profile-service'
import { State } from '../../store/type'
import {
  postOrEditJobActionCreator,
  editAppliedActionCreator,
} from '../../store/slices'

interface Props {
  location: any
  history: any
}

const VideoPreviewPage: React.FC<Props> = ({ history, location }) => {
  const { user, jobAll } = useSelector((state: State) => state)
  const dispatch = useDispatch()
  const jobService = useMemo(() => new JobService(), [])
  const profileService = useMemo(() => new ProfileService(), [])

  const onSubmit = async (e: any) => {
    const [currentJob] = jobAll.filter(
      (eachJob) => eachJob.userId === location.state.userId,
    )
    if (currentJob) {
      const edited = await jobService.edit(user, {
        ...currentJob,
        videoReceived: [
          ...currentJob.videoReceived,
          {
            ...location.state,
            videoBlob: URL.createObjectURL(location.state.videoBlob),
          },
        ],
      })
      const editedApplied = await profileService.editApplied(user, {
        ...currentJob,
        videoReceived: [
          ...currentJob.videoReceived,
          {
            ...location.state,
            videoBlob: URL.createObjectURL(location.state.videoBlob),
          },
        ],
      })

      if (edited.status && edited.editedJob && editedApplied) {
        dispatch(
          postOrEditJobActionCreator({
            ...currentJob,
            videoReceived: [
              ...currentJob.videoReceived,
              {
                ...location.state,
                videoBlob: URL.createObjectURL(location.state.videoBlob),
              },
            ],
          }),
        )
        dispatch(
          editAppliedActionCreator({
            ...currentJob,
            videoReceived: [
              ...currentJob.videoReceived,
              {
                ...location.state,
                videoBlob: URL.createObjectURL(location.state.videoBlob),
              },
            ],
          }),
        )
        alert(
          'Thank you for submitting your video interview. We appreciate your time, and the company will reach out to you for the next process',
        )
        history.push('/profile/applied')
      }
    } else alert('Something goes wrong, cannot send video')
  }
  return (
    <div className={styles.container}>
      <h1>Preview Video</h1>
      {location.state && location.state.videoBlob && (
        <div style={{ width: '100%', maxWidth: 480, height: 640 }}>
          <video
            src={window.URL.createObjectURL(location.state.videoBlob)}
            width={480}
            height={640}
            controls
          />
        </div>
      )}
      <button
        onClick={() => history.push('/record-video', { ...location.state })}
      >
        Record Again
      </button>
      <button onClick={onSubmit}>Submit Interview</button>
    </div>
  )
}

export default VideoPreviewPage
