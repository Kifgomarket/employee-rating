/**
 * Safely parses a string to an integer and optionally checks if the value is within a provided array.
 *
 * @param input - The string to be parsed.
 * @param defaultValue - The default value to return if parsing fails or value is not within the array.
 * @param validValues - Optional array of valid values. If provided, the parsed value must be in this array.
 * @returns The parsed integer if valid, or the default value.
 */
type SafeParseIntParams<T> = {
  input: string | null;
  defaultValue: T;
  validValues?: T[];
};
export default function safeParseInt<T extends number>({
  input,
  defaultValue,
  validValues,
}: SafeParseIntParams<T>): T {
  const parsedValue = parseInt(input ?? defaultValue.toString(), 10);

  if (isNaN(parsedValue)) {
    return defaultValue;
  }

  if (validValues && !validValues.includes(parsedValue as T)) {
    return defaultValue;
  }

  return parsedValue as T;
}
