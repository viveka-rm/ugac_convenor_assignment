import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [courses, setCourses] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [activeSection, setActiveSection]
    = useState("courses");

  useEffect(() => {

    axios.get("http://127.0.0.1:8000/courses/")
      .then((response) => {
        setCourses(response.data);
      });

    axios.get("http://127.0.0.1:8000/registrations/all/")
      .then((response) => {
        setRegistrations(response.data);
      });

  }, []);
  const [newTitle, setNewTitle]
  = useState("");

  const [newDescription,
  setNewDescription]
    = useState("");

  const [newInstructor,
  setNewInstructor]
    = useState("");

  const [newSchedule,
  setNewSchedule]
    = useState("");

  const [newCapacity,
  setNewCapacity]
    = useState("");

  const enrollCourse = (courseId) => {

    axios.post(
      "http://127.0.0.1:8000/registrations/register/",
      {
        user_id: loggedInUser.user_id,
        course_id: courseId
      }
    )

    .then(() => {

      alert("Course Registered!");

    })

    .catch((error) => {

      alert("Already Registered!");

      console.log(error);

    });

  };

  const updateRegistrationStatus = (
    registrationId,
    status
  ) => {

    axios.post(
      `http://127.0.0.1:8000/registrations/update/${registrationId}/`,
      {
        status: status
      }
    )

    .then(() => {

      alert(`Registration ${status}`);

      setRegistrations(

        registrations.map((registration) =>

          registration.id === registrationId

            ? {
                ...registration,
                status: status
              }

            : registration

        )

      );

    })

    .catch((error) => {

      console.log(error);

    });

  };
  const addCourse = () => {

  axios.post(
    "http://127.0.0.1:8000/courses/add/",
    {
      title: newTitle,
      description: newDescription,
      instructor: newInstructor,
      schedule: newSchedule,
      capacity: newCapacity,
      registration_status: "Open"
    }
  )

  .then((response) => {

    alert("Course Added!");

    setCourses([
      ...courses,
      response.data
    ]);

  })

  .catch((error) => {

    console.log(error);

  });

};
const deleteCourse = (courseId) => {

  axios.delete(
    `http://127.0.0.1:8000/courses/delete/${courseId}/`
  )

  .then(() => {

    alert("Course Deleted!");

    setCourses(

      courses.filter(
        (course) =>
          course.id !== courseId
      )

    );

  })

  .catch((error) => {

    console.log(error);

  });

};
const editCourse = (course) => {

  const updatedTitle = prompt(
    "Enter new title",
    course.title
  );

  const updatedDescription = prompt(
    "Enter new description",
    course.description
  );

  const updatedInstructor = prompt(
    "Enter new instructor",
    course.instructor
  );

  const updatedSchedule = prompt(
    "Enter new schedule",
    course.schedule
  );

  const updatedCapacity = prompt(
    "Enter new capacity",
    course.capacity
  );

  axios.put(
    `http://127.0.0.1:8000/courses/edit/${course.id}/`,
    {
      title: updatedTitle,
      description: updatedDescription,
      instructor: updatedInstructor,
      schedule: updatedSchedule,
      capacity: updatedCapacity,
      registration_status:
        course.registration_status
    }
  )

  .then((response) => {

    alert("Course Updated!");

    setCourses(

      courses.map((c) =>

        c.id === course.id
          ? response.data
          : c

      )

    );

  })

  .catch((error) => {

    console.log(error);

  });

};

  const loginUser = () => {

    axios.post(
      "http://127.0.0.1:8000/users/login/",
      {
        username: username,
        password: password
      }
    )

    .then((response) => {

      setLoggedInUser(response.data);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

    })

    .catch((error) => {

      alert("Invalid Credentials");

      console.log(error);

    });

  };

  const logoutUser = () => {

    localStorage.removeItem("user");

    setLoggedInUser(null);

  };

  return (

    <div className="container">

      {!loggedInUser ? (

        <div className="login-box">

          <h1>Login</h1>

          <input
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button onClick={loginUser}>
            Login
          </button>

        </div>

      ) : (

        <div>

          {loggedInUser.is_admin ? (

            <div className="dashboard">

              <div className="sidebar">

                <h2>Admin Panel</h2>

                <button
                  onClick={() =>
                    setActiveSection(
                      "registrations"
                    )
                  }
                >
                  Registrations
                </button>

                <button
                  onClick={() =>
                    setActiveSection("courses")
                  }
                >
                  Courses
                </button>

                <button onClick={logoutUser}>
                  Logout
                </button>

              </div>

              <div className="main-content">

                <h1>
                  Welcome Admin
                  {" "}
                  {loggedInUser.username}
                </h1>

                {activeSection ===
                  "registrations" && (

                  <div>

                    <h2>
                      All Registrations
                    </h2>

                    <div className="course-grid">

                      {registrations.map(
                        (registration) => (

                        <div
                          key={registration.id}
                          className="course-card"
                        >

                          <p>
                            <strong>
                              User ID:
                            </strong>
                            {" "}
                            {registration.username}
                          </p>

                          <p>
                            <strong>
                              Course ID:
                            </strong>
                            {" "}
                            {registration.course}
                          </p>
                           <p>
                            <strong>
                              Course Name:
                            </strong>
                            {" "}
                            {registration.course_title}
                          </p>


                          <p>
                            <strong>
                              Status:
                            </strong>
                            {" "}
                            {registration.status}
                          </p>

                          <button
                            onClick={() =>
                              updateRegistrationStatus(
                                registration.id,
                                "Approved"
                              )
                            }
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              updateRegistrationStatus(
                                registration.id,
                                "Rejected"
                              )
                            }
                          >
                            Reject
                          </button>

                        </div>

                      ))}

                    </div>

                  </div>

                )}

                {activeSection ===
                  "courses" && (

                  <div>
                    <div className="course-card">

                        <h2>Add Course</h2>

                        <input
                          type="text"
                          placeholder="Title"
                          onChange={(e) =>
                            setNewTitle(e.target.value)
                          }
                        />

                        <input
                          type="text"
                          placeholder="Description"
                          onChange={(e) =>
                            setNewDescription(
                              e.target.value
                            )
                          }
                        />

                        <input
                          type="text"
                          placeholder="Instructor"
                          onChange={(e) =>
                            setNewInstructor(
                              e.target.value
                            )
                          }
                        />

                        <input
                          type="text"
                          placeholder="Schedule"
                          onChange={(e) =>
                            setNewSchedule(
                              e.target.value
                            )
                          }
                        />

                        <input
                          type="number"
                          placeholder="Capacity"
                          onChange={(e) =>
                            setNewCapacity(
                              e.target.value
                            )
                          }
                        />

                        <button onClick={addCourse}>
                          Add Course
                        </button>

                      </div>

                    <h2>All Courses</h2>

                    <div className="course-grid">

                      {courses.map((course) => (

                        <div
                          key={course.id}
                          className="course-card"
                        >

                          <h2>
                            {course.title}
                          </h2>

                          <p>
                            {course.description}
                          </p>

                          <p>
                            Instructor:
                            {" "}
                            {course.instructor}
                          </p>
                        <div className="action-buttons">

                            <button
                              onClick={() =>
                                editCourse(course)
                              }
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                deleteCourse(course.id)
                              }
                            >
                              Delete
                            </button>

                        </div>

                        </div>

                      ))}

                    </div>

                  </div>

                )}

              </div>

            </div>

          ) : (

            <div className="dashboard">

              <div className="sidebar">

                <h2>Student Panel</h2>

                <button
                  onClick={() =>
                    setActiveSection("courses")
                  }
                >
                  Courses
                </button>

                <button
                  onClick={() =>
                    setActiveSection(
                      "registrations"
                    )
                  }
                >
                  My Registrations
                </button>

                <button onClick={logoutUser}>
                  Logout
                </button>

              </div>

              <div className="main-content">

                <h1>
                  Welcome
                  {" "}
                  {loggedInUser.username}
                </h1>

                {activeSection ===
                  "courses" && (

                  <div className="course-grid">

                    {courses.map((course) => (

                      <div
                        key={course.id}
                        className="course-card"
                      >

                        <h2>
                          {course.title}
                        </h2>

                        <p>
                          {course.description}
                        </p>

                        <p>
                          <strong>
                            Instructor:
                          </strong>
                          {" "}
                          {course.instructor}
                        </p>

                        <p>
                          <strong>
                            Schedule:
                          </strong>
                          {" "}
                          {course.schedule}
                        </p>

                        <p>
                          <strong>
                            Capacity:
                          </strong>
                          {" "}
                          {course.capacity}
                        </p>

                        <button
                          onClick={() =>
                            enrollCourse(
                              course.id
                            )
                          }
                        >
                          Enroll
                        </button>

                      </div>

                    ))}

                  </div>

                )}

                {activeSection ===
                  "registrations" && (

                  <div>

                    <h2>
                      My Registrations
                    </h2>

                    <div className="course-grid">

                      {registrations
                        .filter(
                          (registration) =>
                            registration.user ===
                            loggedInUser.user_id
                        )

                        .map((registration) => (

                          <div
                            key={registration.id}
                            className="course-card"
                          >

                            <p>
                              <strong>
                                Course ID:
                              </strong>
                              {" "}
                              {registration.course}
                            </p>
                          <p>
                            <strong>
                              Course Name:
                            </strong>
                            {" "}
                            {registration.course_title}
                          </p>

                            <p>
                              <strong>
                                Status:
                              </strong>
                              {" "}
                              {registration.status}
                            </p>

                          </div>

                        ))}

                    </div>

                  </div>

                )}

              </div>

            </div>

          )}

        </div>

      )}

    </div>

  );

}

export default App;