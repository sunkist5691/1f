import { Job } from '../store/type'

type Form = {
  candidateId: string
  name: string
  city: string
  hobbies: string
  highest_degree: string
  experience_level: string
  description: string
  applied: Job[]
  email: string
}
export default class ProfileService {
  async getAll() {
    const profiles = await fetch(
      `${process.env.REACT_APP_PRODUCTION_URL}/profiles`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return await profiles.json()
  }

  async get(user: any) {
    const profile = await fetch(
      `${process.env.REACT_APP_PRODUCTION_URL}/profiles/${user.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: user.token,
        },
      },
    )
    return await profile.json()
  }

  async add(user: any, form: Form) {
    const profile = await fetch(
      `${process.env.REACT_APP_PRODUCTION_URL}/profiles`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: user.token,
        },
        body: JSON.stringify({ ...form }),
      },
    )

    return await profile.json()
  }

  async addApplied(user: any, job: Job) {
    const added = await fetch(
      `${process.env.REACT_APP_PRODUCTION_URL}/profiles/${user.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: user.token,
        },
        body: JSON.stringify({ ...job }),
      },
    )
    return await added.json()
  }

  async edit(user: any, form: Form) {
    const profile = await fetch(
      `${process.env.REACT_APP_PRODUCTION_URL}/profiles`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: user.token,
        },
        body: JSON.stringify({ ...form }),
      },
    )

    return await profile.json()
  }

  async remove(user: any, form: Form) {
    const profile = await fetch(
      `${process.env.REACT_APP_PRODUCTION_URL}/profiles/${form.candidateId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: user.token,
        },
      },
    )

    return await profile.json()
  }
}
