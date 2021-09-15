type Form = {
  company: string
  city: string
  job_type: string
  job_title: string
  experience_level: string
  description: string
  userId: string
}
export default class JobService {
  async getAll() {
    const jobs = await fetch(`${process.env.REACT_APP_BASE_URL}/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return await jobs.json()
  }

  async get(user: any) {
    const job = await fetch(
      `${process.env.REACT_APP_BASE_URL}/jobs/${user.id}`,
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

  async add(user: any, form: Form) {
    const job = await fetch(`${process.env.REACT_APP_BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: user.token,
      },
      body: JSON.stringify({ ...form }),
    })

    return await job.json()
  }

  async edit(user: any, form: Form) {
    const job = await fetch(`${process.env.REACT_APP_BASE_URL}/jobs`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: user.token,
      },
      body: JSON.stringify({ ...form }),
    })

    return await job.json()
  }

  async remove(user: any, form: Form) {
    const job = await fetch(
      `${process.env.REACT_APP_BASE_URL}/jobs/${form.userId}`,
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
