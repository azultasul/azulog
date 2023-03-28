const useDate = (dateTye, dateTyeSec) => {
  if (dateTye === null) {
    return [null]
  } else {
    const date = dateTye ? new Date(dateTye) : new Date()
    const dateSec = dateTyeSec ? new Date(dateTyeSec) : new Date()

    const dateInfo = {
      ko: new Intl.DateTimeFormat('ko-KR').format(date),
      termMonth: Math.round((dateSec.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)),
    }
    return [dateInfo]
  }
}
export default useDate
