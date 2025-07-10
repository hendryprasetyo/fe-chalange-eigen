import Moment from 'moment'

export const generateTransactionId = () => {
  const appId = 'AWB32'
  const identifierString = '00000'
  // Asia/Jakarta = UTC+7 → offset dalam menit = 7 * 60 = 420
  const timeStamp = Moment().utcOffset(420).format('YYMMDDHHmmssSSS')
  const changeableDigit = '0'

  return [appId, timeStamp, identifierString, changeableDigit].join('')
}

export const formatWording = (
  baseWording: string,
  replacements: Record<string, string>
): string => {
  return Object.entries(replacements).reduce((result, [key, value]) => {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escapedKey, 'g')
    return result.replace(regex, value)
  }, baseWording)
}
