export default {
  methods: {
    doesDataChange(oldData, newData) {
      let isDifferent = false
      let keys = Object.keys(oldData)
      keys.forEach(el => {
        if (typeof(oldData[el]) === "string") {
          if (oldData[el].toLowerCase() !== newData[el].toLowerCase()) {
            isDifferent = true
          }
        } else {
          if (oldData[el] !== newData[el]) {
            isDifferent = true
          }
        }
      })
      return isDifferent
    },
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