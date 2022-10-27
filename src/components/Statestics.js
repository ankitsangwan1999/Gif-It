import React, { useState, useEffect } from "react";

// localstorage has two objects: success and failure
// success object contains urls of video successfully converted to gif
// failure object contains urls of video that failed to convert to gif

const successObj = JSON.parse(localStorage.getItem("success"));
const failureObj = JSON.parse(localStorage.getItem("failure"));

const Statestics = () => {
	const [success, setSuccess] = useState(successObj);
	const [failure, setFailure] = useState(failureObj);

	return (
		<div className="Statestics">
			{success ? (
				<div className="success">
					<h3>Success</h3>
					<ul>
						{Object.keys(success).map((key) => (
							<li key={key}>
								<a href={success[key]}>{key}</a>
							</li>
						))}
					</ul>
				</div>
			) : (
				<p>No videos converted to gif</p>
			)}
			{failure ? (
				<div className="failure">
					<h3>Failure</h3>
					<ul>
						{Object.keys(failure).map((key) => (
							<li key={key}>
								<a href={failure[key]}>{key}</a>
							</li>
						))}
					</ul>
				</div>
			) : (
				<p>No videos failed to convert to gif</p>
			)}
		</div>
	);
}