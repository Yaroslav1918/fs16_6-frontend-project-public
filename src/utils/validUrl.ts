const validUrl = (urlsString: string) => {
  try {
    const urls: string[] = JSON.parse(urlsString.replace(/\\"/g, '"'));
    const urlPattern = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/[^/]+)*\/?$/i;
    return urls.every((url) => urlPattern.test(url));
  } catch (e) {
    return false;
  }
};

export default validUrl;
