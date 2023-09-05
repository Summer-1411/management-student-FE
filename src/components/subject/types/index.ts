import { FormInstance } from "antd"
import { IDepartment, ISubject } from "~/types"

export interface CreateUpdateProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  listDepartment: IDepartment[]
  form: FormInstance<any>
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  edit: boolean
  initValue: ISubject | undefined
  setInitValue: React.Dispatch<React.SetStateAction<ISubject | undefined>>
}