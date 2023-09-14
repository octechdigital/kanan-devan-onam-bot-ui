export function calculateAge(day: number, month: number, year: number): number {
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  let age = todayYear - year;
  if (todayMonth < month) {
    age--;
  } else if (todayMonth === month && todayDay < day) {
    age--;
  }
  return age;
}

export function isValidDate(day: number, month: number, year: number): boolean {
  //January, March, May, July, August, October, and December.
  const longMonths = [1, 3, 5, 7, 8, 10, 12];
  if (day === 0 || month === 0 || year === 0) {
    return false;
  } else if (!longMonths.includes(month) && day > 30) {
    return false;
  } else if (month === 2 && day > 28) {
    if (!(year % 4 === 0 && day === 29)) {
      return false;
    }
  }
  return true;
}

export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const formats = ["jpg", "png", "jpeg"];
    let extension = file.name.split(".").pop();
    if (extension) {
      extension = extension.toLowerCase();
      if (formats.includes(extension)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      } else {
        reject("Unsupported file format - " + extension);
      }
    } else {
      reject("Unsupported file format - " + extension);
    }
  });

/**
 * Opens given url url in a new tab
 * @param {string} url
 * @return {void}
 */
export function openInNewTab(url: string): void {
  const link = document.createElement("a");
  link.target = "_blank";
  link.href = url;
  document.body.append(link);
  link.click();
}
