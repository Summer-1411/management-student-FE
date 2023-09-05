import { ReactNode, createContext, useContext, useState } from "react";
import { StudentContextProps } from "../types";
import { useGetTeacher, useSearchClass, useSearchDepartment, useSearchMajor } from "~/services";
import { Form } from "antd";
import { IStudent } from "~/types";

export const StudentContext = createContext<StudentContextProps | any>('Context bảng Student');

export const StudentProvider = ({
  children,
}: {
  children?: ReactNode | undefined
}
) => {


  const { listClass } = useSearchClass({
    status: 1
  })
  const [formCreateUpdate] = Form.useForm();
  const [detailStudent, setDetailStudent] = useState<IStudent>()
  const [openView, setOpenView] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [initValue, setInitValue] = useState<IStudent>()
  const value = {
    listClass,
    formCreateUpdate,
    detailStudent,
    setDetailStudent,
    openView,
    setOpenView,
    edit,
    setEdit,
    initValue,
    setInitValue
  }
  return <StudentContext.Provider value={value as StudentContextProps}>
    {children}
  </StudentContext.Provider>
}

export const useStudent = () => {
  return useContext(StudentContext)
}