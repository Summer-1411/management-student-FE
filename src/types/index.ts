

export interface IUser {
  id?: number
  code?:string //mã
  password?: string
  avatar?: string
  name?: string
  email?: string
  address?: string
  phone?: string
  idCode?: string //chứng minh thư
  birthday?: string
  role?: number //0 admin, 1 giáo viên, 2 sinh viên
  status?: number
}

export interface IAdmin extends IUser {
  level?: string
}

export interface IDepartment {
  id?: number
  name?: string
  lead?: string
  phone?: string
  description?: string
  status?: Number
}

export interface IMajor {
  id?: number
  name?: string
  idDepartment?: number
  id_department?: number
  description?: string
  status?: number
}


export interface IClass {
  id?: number
  name?: string
  teacher?: number
  id_major?: number
  quantity?: number
  schoolYear?: string
  status?: number
}

export interface ITeacher extends IUser {
  level?: number
}

// id		password	name	email	address	phone	idCode	avatar	birthday	id_class	role	status	

export interface IStudent extends IUser {
  id_class?: number
  idClass?: number
}

export interface ISubject {
  id?: number
  name?: string
  id_department?: number
  quantity?: number
  description?: string
  status?: number
}


export interface IClassSection {
  id?: number
  subject_id?: number
  max?: number
  current?: number
  teacher_id?: number
  time?: string
  status?: number
}