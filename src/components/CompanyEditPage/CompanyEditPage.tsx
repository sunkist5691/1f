import React, { useEffect, useState, useRef, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../../store/type'
import JobService from '../../service/job-service'
import {
  postOrEditJobActionCreator,
  removeJobActionCreator,
} from '../../store/slices'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './CompanyEditPage.module.css'

type TParams = { id: string }
type Form = {
  company: string
  city: string
  job_type: string
  job_title: string
  experience_level: string
  description: string
  userId: string
}

const CompanyEditPage: React.FC<RouteComponentProps<TParams>> = ({
  history,
}) => {
  const formRef = useRef<HTMLFormElement>(null)
  const typeRef = useRef<HTMLSelectElement>(null)
  const expRef = useRef<HTMLSelectElement>(null)
  const { job, user } = useSelector((state: State) => state)
  const dispatch = useDispatch()
  const jobService = useMemo(() => new JobService(), [])
  const [form, setForm] = useState<Form>({
    company: '',
    city: '',
    job_type: '',
    job_title: '',
    experience_level: '',
    description: '',
    userId: '',
  })
  useEffect(() => {
    if (job) setForm(job)
  }, [user, job, history])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user && job) {
      const edited = await jobService.edit(user, { ...form })
      if (edited.status && edited.editedJob) {
        dispatch(
          postOrEditJobActionCreator({
            ...form,
          }),
        )
        if (formRef && formRef.current) formRef.current.reset()
      }
    } else {
      alert('Please post job first before edit')
      history.push('/company/post')
    }
    if (window.confirm('Successfully Edited!, Click ok move to home page')) {
      history.push('/home')
    }
    if (typeRef && typeRef.current) typeRef.current.value = form.job_type
    if (expRef && expRef.current) {
      expRef.current.value = form.experience_level
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

  const onDelete = (e: React.FormEvent) => {
    e.preventDefault()
    if (job && window.confirm('Are you sure you want to delete?')) {
      jobService
        .remove(user, job)
        .then((res) => {
          console.log('HELLO WOLRD: ', res)
          dispatch(removeJobActionCreator())
          setForm({
            company: '',
            city: '',
            job_type: '',
            job_title: '',
            experience_level: '',
            description: '',
            userId: '',
          })
          if (formRef && formRef.current) formRef.current.reset()
          alert('Successfully deleted')
          history.push('/home')
        })
        .catch((err) => console.log('Failed to delete job: ', err))
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_sub}>
        <Header />
        <div className={styles.title}>Edit Your Job</div>
        <form ref={formRef} className={styles.form}>
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
            ref={typeRef}
            className={styles.select}
            name="job_type"
            placeholder="Job Type"
            onChange={onChange}
          >
            <option hidden defaultValue="">
              Choose type of job
            </option>
            <option value="full_time">Full-Time</option>
            <option value="part_time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>

          <select
            ref={expRef}
            className={styles.select}
            name="experience_level"
            placeholder="Experience Level"
            onChange={onChange}
          >
            <option hidden defaultValue="">
              Choose experience level
            </option>
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
            <button
              className={`${styles.button} ${styles.button_edit}`}
              onClick={onSubmit}
            >
              Edit
            </button>
            <button
              className={`${styles.button} ${styles.button_edit}`}
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default CompanyEditPage
