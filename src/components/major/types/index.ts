import { FormInstance } from "antd"
import { IDepartment, IMajor } from "~/types"

export interface DataTypeTable {
  id?: React.Key
  name?: string
  description?: string
  deleted?: string
}

export interface CreateUpdateProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  listDepartment: IDepartment[]
  form: FormInstance<any>
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  isEdit: boolean
  initValue: IMajor | undefined

}
