const useDate = (dateType, dateTypeSec) => {
  if (dateType === null) {
    return [null]
  } else {
    const date = dateType ? new Date(dateType) : new Date()
    const dateSec = dateTypeSec ? new Date(dateTypeSec) : new Date()

    const dateInfo = {
      ko: new Intl.DateTimeFormat('ko-KR').format(date),
      termMonth: Math.round((dateSec.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)),
    }
    return [dateInfo]
  }
}
export default useDate
