import { FormInstance } from "antd"
import { IClass, IDepartment, IMajor, IStudent, ITeacher } from "~/types"

export interface CreateUpdateProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  edit: boolean
   initValue: IClass | undefined
   form: FormInstance<any>
  
}
 
export interface CreateUpdateStudentProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  classInfor: IClass | undefined
  formCreateUpdate: FormInstance<any>
}
 
export interface ClassContextProps {
  listMajor: IMajor[]
  listDepartment: IDepartment[]
  listTeacher: ITeacher[]
  detailStudent: IStudent | undefined
  setDetailStudent: React.Dispatch<React.SetStateAction<IStudent | undefined>>
  openView: boolean
  setOpenView: React.Dispatch<React.SetStateAction<boolean>>
  listClass: IClass[]
  edit: boolean
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  initValue: IStudent | undefined
  setInitValue: React.Dispatch<React.SetStateAction<IStudent | undefined>>
}


export interface DataTypeTable {
  id?: React.Key
  name?: string
  teacher?: string
  phone?: string
  description?: string
  deleted?: string
}

export interface DataTypeTableStudent {
  id?: React.Key
  account?: string
  name?: string
  email?: string
  nationality?: string
  nation?: string
  address?: string
  phoneNumber?: string
  idCode?: string
  birthday?: string
  id_class?: string
  deleted?: string
}