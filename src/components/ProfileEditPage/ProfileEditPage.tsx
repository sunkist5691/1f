import React, { useEffect, useState, useRef, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../../store/type'
import ProfileService from '../../service/profile-service'
import {
  postOrEditProfileActionCreator,
  removeProfileActionCreator,
} from '../../store/slices'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './ProfileEditPage.module.css'

type Form = {
  candidateId: string
  name: string
  city: string
  hobbies: string
  highest_degree: string
  experience_level: string
  description: string
}

const ProfileEditPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const typeRef = useRef<HTMLSelectElement>(null)
  const expRef = useRef<HTMLSelectElement>(null)
  const { profile, user } = useSelector((state: State) => state)
  const dispatch = useDispatch()
  const profileService = useMemo(() => new ProfileService(), [])
  const [form, setForm] = useState<Form>({
    name: '',
    city: '',
    hobbies: '',
    highest_degree: '',
    experience_level: '',
    description: '',
    candidateId: '',
  })
  useEffect(() => {
    if (profile) {
      if (typeRef && typeRef.current && expRef && expRef.current) {
        typeRef.current.value = profile.highest_degree
        expRef.current.value = profile.experience_level
      }
      setForm(profile)
    }
  }, [user, profile, history])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user && profile) {
      const edited = await profileService.edit(user, {
        ...form,
      })
      if (edited.status && edited.editedProfile) {
        dispatch(
          postOrEditProfileActionCreator({
            ...form,
          }),
        )
        if (formRef && formRef.current) formRef.current.reset()
        if (
          window.confirm('Successfully Edited!, Click ok move to home page')
        ) {
          history.push('/home')
        }
      }
    } else {
      alert('Please post profile first before edit')
      history.push('/profile/post')
    }

    if (typeRef && typeRef.current) typeRef.current.value = form.highest_degree
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
    if (profile && window.confirm('Are you sure you want to delete?')) {
      profileService
        .remove(user, profile)
        .then((res) => {
          console.log('HELLO WOLRD: ', res)
          dispatch(removeProfileActionCreator())
          setForm({
            name: '',
            city: '',
            highest_degree: '',
            hobbies: '',
            experience_level: '',
            description: '',
            candidateId: '',
          })
          if (formRef && formRef.current) formRef.current.reset()
          alert('Successfully deleted')
          history.push('/home')
        })
        .catch((err) => console.log('Failed to delete profile: ', err))
    } else alert('Nothing to delete')
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_sub}>
        <Header />
        <div className={styles.title}>Edit Your Profile</div>
        <form ref={formRef} className={styles.form}>
          <input
            className={styles.input}
            name="name"
            type="text"
            placeholder="Name"
            onChange={onChange}
            value={form.name}
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
            name="hobbies"
            type="text"
            placeholder="Hobbies"
            onChange={onChange}
            value={form.hobbies}
          />

          <select
            ref={typeRef}
            className={styles.select}
            name="highest_degree"
            placeholder="Highest Degree"
            onChange={onChange}
          >
            <option defaultValue="">Choose your highest degree</option>
            <option value="High School Diploma">High School</option>
            <option value="Bootcamp">Bootcamp</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Bachelor Degree">Bachelor Degree</option>
            <option value="Master Degree">Master Degree</option>
            <option value="Doctoral Degree">Doctoral Degree</option>
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
            placeholder="Please add profile description"
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

export default ProfileEditPage
