import { FormInstance } from "antd"
import { ISubject, ITeacher } from "~/types"

export interface CreateUpdateProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

//id	subject_id	max	current	teacher_id	time status	

export interface IClassSection {
  id?: number
  subject_id?: number
  max?: number
  current?: number
  teacher_id?: number
  time?: string
  status?: number
}



export interface ClassSectionContextProps {
  listTeacher: ITeacher[]
  listSubject: ISubject[]
  initSearch: IClassSection
  setInitSearch: React.Dispatch<React.SetStateAction<IClassSection>>
  form: FormInstance<any>
  edit: boolean
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  initValue: IClassSection | undefined
  setInitValue: React.Dispatch<React.SetStateAction<IClassSection | undefined>>
}