export interface User {
  id: string
  name: string
  email: string
  role: string
  token: string
}

export interface Job {
  company: string
  city: string
  job_type: string
  job_title: string
  experience_level: string
  description: string
  userId: string
  applicants: []
}

export interface Profile {
  candidateId: string
  name: string
  city: string
  hobbies: string
  highest_degree: string
  experience_level: string
  description: string
}

export interface State {
  user: User | null
  profile: Profile | null
  job: Job | null
  jobAll: Job[] | []
  search: string
}
