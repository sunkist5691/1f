import { Job, Profile } from '../store/type'

export default class JobService {
  async getAll() {
    const jobs = await fetch(`${process.env.REACT_APP_PRODUCTION_URL}/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return await jobs.json()
  }

  async get(user: any) {
    const job = await fetch(
      `${process.env.REACT_APP_PRODUCTION_URL}/jobs/${user.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: user.token,
        },
      },
    )
    return await job.json()
  }

  async add(user: any, form: Job) {
    const job = await fetch(`${process.env.REACT_APP_PRODUCTION_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: user.token,
      },
      body: JSON.stringify({ ...form }),
    })

    return await job.json()
  }

  async addApplicant(user: any, jobId: string, profile: Profile) {
    const added = await fetch(
      `${process.env.REACT_APP_PRODUCTION_URL}/jobs/${jobId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: user.token,
        },
        body: JSON.stringify({ ...profile }),
      },
    )

    return await added.json()
  }

  async edit(user: any, form: Job) {
    const job = await fetch(`${process.env.REACT_APP_PRODUCTION_URL}/jobs`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: user.token,
      },
      body: JSON.stringify({ ...form }),
    })

    return await job.json()
  }

  async remove(user: any, form: Job) {
    const job = await fetch(
      `${process.env.REACT_APP_PRODUCTION_URL}/jobs/${form.userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: user.token,
        },
      },
    )

    return await job.json()
  }
}
