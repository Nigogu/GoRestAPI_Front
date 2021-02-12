export default class Backend {
  static api_url = "https://gorest.co.in/public-api/";

  static SendRequest(path, method, headers, body) {
    let answer = fetch(this.api_url.concat(path), {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });
    return answer;
  }
}
