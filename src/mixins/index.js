export default {
  methods: {
    dateToDateString(date, dateFormat, stringFormat) {
      let months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
      let year, month, day, tempDate
      switch (dateFormat) {
      case "yyyy/mm/dd":
        tempDate = date.split("/")
        year = tempDate[0]
        month = tempDate[1]
        day = tempDate[2]
        break
      case "yyyy-mm-dd":
        tempDate = date.split("-")
        year = tempDate[0]
        month = tempDate[1]
        day = tempDate[2]
        break
      case "dd/mm/yyyy":
        tempDate = date.split("/")
        year = tempDate[2]
        month = tempDate[1]
        day = tempDate[0]
        break
      case "dd-mm-yyyy":
        tempDate = date.split("-")
        year = tempDate[2]
        month = tempDate[1]
        day = tempDate[0]
        break
      }
      switch (stringFormat) {
      case "no-day":
        return `${day} ${months[parseInt(month) - 1]} ${year}`
        // break
      }
    },
    getBase64(file) {
      return new Promise((res, rej) => {
        let reader = new FileReader()
        reader.onload = () => {
          res(reader.result)
        }
        reader.onerror = rej
        reader.readAsDataURL(file)
      })
    },
  }
}