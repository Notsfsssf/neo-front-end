import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import API from "./API";
class ArticleD {
  title: string | undefined;
}
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("axios type", async () => {
  let result = await API.get("/article");
  let article = result.data[0] as ArticleD;
  console.log(article.title);
});
