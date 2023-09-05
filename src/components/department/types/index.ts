
import { FormInstance } from "antd"
import { IDepartment, ITeacher } from "~/types"

export interface CreateUpdateProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  listTeacher: ITeacher[]
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  form: FormInstance<any>
  initValue: IDepartment | undefined
}

export interface FilterProps {
  setInitSearch: React.Dispatch<React.SetStateAction<IDepartment>>
  
}

export interface DataTypeTable {
  id?: React.Key
  name?: string
  lead?: string
  phone?: string
  description?: string
  status?: string
}