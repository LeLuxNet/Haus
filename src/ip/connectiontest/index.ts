import axios from "axios";
import { Plugin } from "../../plugins";
import { State } from "../../state";

interface ConnectionService {
  url: string;

  status?: number;
  body?: string;
}

export const services: { [key: string]: ConnectionService } = {
  google: {
    url: "http://connectivitycheck.gstatic.com/generate_204",
    /*
    http://connectivitycheck.gstatic.com/generate_204
    http://connectivitycheck.android.com/generate_204
    http://www.gstatic.com/generate_204
    http://clients3.google.com/generate_204
    http://google.com/generate_204
    */
    status: 204,
  },
  apple: {
    url: "http://captive.apple.com",
    body:
      "<HTML><HEAD><TITLE>Success</TITLE></HEAD><BODY>Success</BODY></HTML>\n",
  },
  microsoft: {
    url: "http://www.msftncsi.com/ncsi.txt",
    body: "Microsoft NCSI",
  },
  nintendo: {
    url: "http://conntest.nintendowifi.net",
    body: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html>
            <head>
            <title>HTML Page</title>
            </head>
            <body bgcolor="#FFFFFF">
            This is test.html page
            </body>
            </html>
          `,
  },
  firefox: {
    url: "http://detectportal.firefox.com/success.txt",
    body: "success\n",
  },
};

export default <Plugin>{
  name: "Connection check",

  create: async ({ service }) => {
    const s = services[service];

    const connected = new State<boolean>({
      get: () =>
        axios
          .get(s.url, {
            validateStatus: (status) => status === (s.status || 200),
          })
          .then((res) => res.data === (s.body || ""))
          .catch(() => false),
    });

    return {
      fields: { connected },
    };
  },
};
