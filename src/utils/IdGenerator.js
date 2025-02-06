const str = '1234567890'
export const IdGenerator = (IdLength) => {
    let Id = '';
    for (let i = 0; i < IdLength; i++) {
        Id += str[Math.floor(Math.random() * (str.length - 0))]
    }
    return Id
}