import { ReactNode, createContext, useContext, useState } from "react";
import { ClassContextProps } from "../types";
import { useGetTeacher, useSearchClass, useSearchDepartment, useSearchMajor } from "~/services";
import { IStudent } from "~/types";

export const ClassContext = createContext<ClassContextProps | any>('Context bảng class');

export const ClassProvider = ({
  children,
}: {
  children?: ReactNode | undefined
}) => {
  const { listMajor } = useSearchMajor({
    status: 1
  })
  const { listTeacher } = useGetTeacher({
    status: 1
  })
  const { listDepartment } = useSearchDepartment({
    status: 1
  })
  const { listClass } = useSearchClass({
    status: 1
  })
  const [detailStudent, setDetailStudent] = useState<IStudent>()
  const [openView, setOpenView] = useState<boolean>(false)

  const [edit, setEdit] = useState<boolean>(false)
  const [initValue, setInitValue] = useState<IStudent>()
  const value = {
    listMajor,
    listDepartment,
    listTeacher,

    detailStudent,
    setDetailStudent,
    openView,
    setOpenView,
    listClass,
    edit,
    setEdit,
    initValue,
    setInitValue
  }
  return <ClassContext.Provider value={value as ClassContextProps}>
    {children}
  </ClassContext.Provider>
}

export const useClass = () => {
  return useContext(ClassContext)
}