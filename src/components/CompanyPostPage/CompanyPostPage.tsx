import React, { useState, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { postOrEditJobActionCreator } from '../../store/slices'
import { State } from '../../store/type'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import JobService from '../../service/job-service'
import styles from './CompanyPostPage.module.css'

type Form = {
  userId: string
  company: string
  city: string
  job_title: string
  job_type: string
  experience_level: string
  description: string
}

const CompanyPostPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const jobService = new JobService()
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.user)

  const [form, setForm] = useState<Form>({
    userId: user ? user.id : '',
    company: '',
    city: '',
    job_type: '',
    job_title: '',
    experience_level: '',
    description: '',
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      const added = await jobService.add(user, {
        ...form,
        userId: user.id,
        applicants: [],
      })
      if (added.status) {
        alert('Successfully added')
        dispatch(
          postOrEditJobActionCreator({
            ...form,
            userId: user.id,
            applicants: [],
          }),
        )
        setForm({
          ...form,
          company: '',
          city: '',
          job_title: '',
          job_type: '',
          experience_level: '',
          description: '',
        })
        if (formRef && formRef.current) {
          formRef.current.reset()
        }
      } else alert("You've already post a job")
      history.push('/')
    }
  }

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_sub}>
        <Header />
        <div className={styles.title}>Post Your Job</div>
        <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
          <input
            className={styles.input}
            name="company"
            type="text"
            placeholder="Company name"
            onChange={onChange}
            value={form.company}
          />
          <input
            className={styles.input}
            name="city"
            type="text"
            placeholder="City"
            onChange={onChange}
            value={form.city}
          />
          <input
            className={styles.input}
            name="job_title"
            type="text"
            placeholder="Job Title"
            onChange={onChange}
            value={form.job_title}
          />

          <select
            className={styles.select}
            name="job_type"
            placeholder="Job Type"
            onChange={onChange}
          >
            <option defaultValue="">Choose type of job</option>
            <option value="full_time">Full-Time</option>
            <option value="part_time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>

          <select
            className={styles.select}
            name="experience_level"
            placeholder="Experience Level"
            onChange={onChange}
          >
            <option defaultValue="">Choose experience level</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="10">10</option>
          </select>
          <textarea
            name="description"
            className={styles.textarea}
            placeholder="Please add job description"
            onChange={onChange}
            value={form.description}
          ></textarea>
          <div className={styles.button_container}>
            <button className={`${styles.button} ${styles.button_post}`}>
              Post
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default CompanyPostPage
