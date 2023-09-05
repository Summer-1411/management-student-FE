import { toast } from 'react-toastify';
export const API = {
  DEPARTMENT: 'http://localhost:6860/api/department',
  TEACHER: ' http://localhost:6865/api/teacher',
  ADMIN: 'http://localhost:6868/api/v1',
  MAJOR: 'http://localhost:6862/api/major',
  CLASS: 'http://localhost:6861/api/class',
  STUDENT: 'http://localhost:6864/api/student',
  SUBJECT: 'http://localhost:6863/api/subject',
  CLASS_SECTION: 'http://localhost:6867/api/class-section',
}
export const toastOption = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
}
export const IMAGE_LINK = 'http://localhost:6868/images'
export const KEY_LOCAL = "$2b$10$9BdIuZprM04QqlQ1XW9BGuy5RezSfUq9SzTbs0mgiAhxdZLfmLGJu"

export const listStatus = [
  {
    value: 1,
    label: "Hoạt động",
  },
  {
    value: 0,
    label: "Không hoạt động",
  }
]

export const listPosition = [
  {
    value: 0,
    label: "Giáo viên",
  },
  {
    value: 1,
    label: "Trưởng khoa",
  }
]