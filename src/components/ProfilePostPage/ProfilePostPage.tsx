import React, { useState, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { postOrEditProfileActionCreator } from '../../store/slices'
import { State } from '../../store/type'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ProfileService from '../../service/profile-service'
import styles from './ProfilePostPage.module.css'

type Form = {
  candidateId: string
  name: string
  city: string
  hobbies: string
  highest_degree: string
  experience_level: string
  description: string
}

const ProfilePostPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const profileService = new ProfileService()
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.user)

  const [form, setForm] = useState<Form>({
    candidateId: user ? user.id : '',
    name: '',
    city: '',
    highest_degree: '',
    hobbies: '',
    experience_level: '',
    description: '',
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      const added = await profileService.add(user, {
        ...form,
        candidateId: user.id,
      })
      if (added.status) {
        alert('Successfully added')
        dispatch(
          postOrEditProfileActionCreator({
            ...form,
            candidateId: user.id,
          }),
        )
        setForm({
          ...form,
          name: '',
          city: '',
          hobbies: '',
          highest_degree: '',
          experience_level: '',
          description: '',
        })
        if (formRef && formRef.current) {
          formRef.current.reset()
        }
      } else alert("You've already created and posted a profile")
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
            name="name"
            type="text"
            placeholder="name"
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
            placeholder="Please add more description if you want"
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

export default ProfilePostPage
