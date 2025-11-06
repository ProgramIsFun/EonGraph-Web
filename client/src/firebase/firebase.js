import 'firebase/auth';
// import 'firebase/database';
import 'firebase/firestore';
import * as firebase from "firebase";
import GitHub from "github-api";
import {cgg} from "../util/helperfile";
import {firebaseConfig} from "./config1";

/**
 * Creates and initializes a Firebase app.
 */


// replace WITH ur own config!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const app = firebase.initializeApp(

    firebaseConfig


);

export default app;
export const dbbbbb = firebase.firestore();


export const auth = firebase.auth

export function repoooooo(setnotice, setrepo) {
    const getRepoData = async () => {
        cgg("getting")
        setnotice("getting data from github api")
        // case 1 we call REST directly


        // const repoUrl = `https://api.github.com/users/${username}/repos`;
        //
        // // console.log
        // const config = {
        //     headers: { Authorization: `Bearer ${access_token}` }
        // };
        // console.log("making request to ",repoUrl)
        // axios.get(repoUrl,null,config).then((responses) => {
        //     // console.log("responsesssss",responses)
        //     const repos = responses.data.map(({name, language, html_url, created_at, description}) => {
        //         return {name, language, html_url, created_at, description};
        //     })
        //     // console.log("origin response is ",response);
        //     console.log("addsssssssssssssss ", repos.length);
        //     response["repo"] = repos;
        //     console.log("returning to ")
        //     return res.status(200).json(response);
        //
        // }).catch(error => {
        //     console.log(`inside getrepos error1233213333: ${error}`)
        //     // this.setState({
        //     //     errorMessage: error.response.statusText
        //     // })
        // });


        // case 2 use library that call REST for you
        // https://github.com/github-tools/github


        // need to get the token from server first
        var docRef = dbbbbb.collection("users").doc(auth().currentUser.uid);

        const doc = await docRef.get()
        let ttoken = doc.data().accessToken
        // cgg(doc.data().accessToken)

        // let tokenn=

        const gh = new GitHub({
            token: ttoken
            // make sure this has repo scope right for private repo list

            // however for safty, no read only scope  https://stackoverflow.com/a/72326284/10964992
            // dangerous as hell

            // user has to tick the organization access in order for listing the repo in that organization that user have access
            // what should user do if they want to add in more organization?
            // 1. tell them logout github doesnt work
            // 2. tell them to change scope in their github account
            //   2.1 after change, does original access token have effect?  Yes
            //
            // also note if ac A approve oauth app D to access organization C,  ac B(if member of C) could see D have access to C in oauth procedure


        });

        const me = gh.getUser();


        let repoos;
        try {
            repoos = await me.listRepos()
            setnotice(p => {
                return p + " successful, got " + repoos.data.length + " repos."
            })
            // this list all repo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // later also user UI will wait for data retriving.

            /////////////////////////////////////////// IF promise chain intead of async
            // .then(function({data: reposJson}) {
            //     console.log(`clayreimann has ${reposJson.length} repos!`);
            //     console.log(reposJson)
            // });
        } catch (e) {
            setnotice(p => {
                return p + "Fail, access token not longer valid, maybe user revoke access "
            })
            console.log("this access token not longer valid, maybe user revoke access  ")
            return
        } finally {

        }

        cgg("stored", repoos)
        setrepo(repoos.data)
        setnotice(p => {
                return p + " saving data to database."
            }
        )






        if (0) { // one request in one document or inside one document?

            var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());

            await dbbbbb.collection("users").doc(auth().currentUser.uid).collection("repofetchhhhhhhhh").doc().set({
                repodata: repoos.data,
                time: myTimestamp
            })
            // Uncaught (in promise) FirebaseError: Document 'projects/githubvisssss202324/databases/(default)/documents/users/NcVakMNaAEYR0wT7eiU0Ax5HTi82/repofetchhhhhhhhh/6j5IKFgVkBmsqCoyWMyd' cannot be written because its size (2,971,208 bytes) exceeds the maximum allowed size of 1,048,576 bytes.


            setnotice(p => {
                return p + " Succesfully saved data to database."
            })
        }


        try {

            const json = JSON.stringify(repoos.data);
            const blob = new Blob([json], {type: 'application/json'});
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = "state.json"; // or another filename of your choosing
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        } catch (e) {
            setnotice(p => {
                return p + " Fail to download json file."
            })
            console.log("Fail to download json file.")
            return
        } finally {
        }





        return
    }
    return getRepoData;
}

export const l=console.log
export const ee=console.error