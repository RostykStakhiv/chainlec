# Documentation
## Elections
***
 Gets the information about specific election

* **URL**
  _chainlec/v1/elections/:id_

* **Method:**
 `GET`
  
*  **URL Params**

   **Required:**
   None

   **Optional:**
   None

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
```json
{ 
    id : "ID",
    title: "Вибори Презедента",
    startTime: 1232131232321,
    endTime: 323213123213,
    state: "notStarted",
    candidates: [
        {
            id: "ID",
            name: "Dido"
        }
    ],
    results: [
        {
            id: "ID of the candidate",
            result: 1213123
        }
    ]
}
```

 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
  ## TBD: other calls
***
* **URL**
    *  `GET` _chainlec/v1/elections/_  
    *  `GET` _chainlec/v1/elections/:id/results_
    *  `GET` _chainlec/v1/elections/:id/candidates_
    *  `PUT` _chainlec/v1/users/:id
        body: role
    *  `POST` _chainlec/v1/election_
        body: startTime, endTime, candidates, title