import { TIMEOUT_SECONDS } from './config';

//a function that stops api call after a certain time , so that we can avoid long api calls and stop them
//we use this timeout to throw and error after a certain time.
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const resp = await Promise.race([
      fetch(url),
      timeout(`${TIMEOUT_SECONDS}`),
    ]);
    // console.log(resp);

    const data = await resp.json();
    // console.log(data);
    if (!resp.ok) {
      throw new Error(`${data.message} (${resp.status})`);
    }

    return data;
    // console.log(data.data.recipe);
  } catch (err) {
    console.log('Error inside helper');
    console.error(err);
    //we use throw to propagate the error from this async function to the other one that called it.
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    console.log('Respond inside sendJSON');
    console.log(res);
    const data = await res.json();
    console.log('data inside sendJSON');
    console.log(data);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

//we can use this AJAX fn and import it , instead of using send and get functions
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
