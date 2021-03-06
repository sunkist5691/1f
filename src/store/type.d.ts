export interface User {
  id: string
  name: string
  email: string
  role: string
  token: string
}

export interface Job {
  userId: string
  company: string
  city: string
  job_type: string
  job_title: string
  experience_level: string
  description: string
  applicants: Profile[]
  videoReceived: VideoReceived[]
}

export interface Profile {
  candidateId: string
  email: string
  name: string
  city: string
  hobbies: string
  highest_degree: string
  experience_level: string
  description: string
  applied: Job[]
  video_request: Job[]
}

export interface State {
  user: User | null
  preUser: any
  currentVideo: any
  profile: Profile | null
  job: Job | null
  jobAll: Job[] | []
  search: string
}

export interface VideoReceived {
  userId: string
  candidateId: string
  videoBlob: any
}
