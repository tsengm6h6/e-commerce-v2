export default {
  methods: {
    dateFormat (timestamp) {
      const formattedDate = new Date(timestamp * 1000)
      const yyyy = formattedDate.getFullYear()
      const mm =
        (formattedDate.getMonth() + 1 < 10 ? '0' : '') + (formattedDate.getMonth() + 1)
      const dd = (formattedDate.getDate() < 10 ? '0' : '') + formattedDate.getDate()
      return `${yyyy}-${mm}-${dd}`
    }
  }
}
