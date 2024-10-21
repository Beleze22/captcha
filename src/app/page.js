"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
	const [inputCaptcha, setInputCaptcha] = useState("");
	const [captchaResult, setcaptchaResult] = useState(false);
	const [captchaText, setCaptchaText] = useState("");

	function generateCaptchaText() {
		let characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let captchaLength = 6;
		let captchaText = "";

		for (let i = 0; i < captchaLength; i++) {
			let randomChar = characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
			captchaText += randomChar;
		}

		return captchaText;
	}

	function generateCaptcha() {
		let canvas = document.getElementById("captchaCanvas");
		let context = canvas.getContext("2d");

		const newCaptchaText = generateCaptchaText();
		setCaptchaText(newCaptchaText);
		console.log(newCaptchaText);
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.font = "30px Arial";

		function getRandomColor() {
			let letters = "0123456789ABCDEF";
			let color = "#";
			for (let i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}

		// Add pontos para dificuldade
		for (let i = 0; i < 100; i++) {
			context.fillStyle = getRandomColor();
			context.beginPath();
			context.arc(
				Math.random() * canvas.width,
				Math.random() * canvas.height,
				1,
				0,
				Math.PI * 2
			);
			context.fill();
		}

		// Add linhas para dificuldade
		context.beginPath();
		for (let index = 0; index < 8; index++) {
			context.moveTo(
				Math.random() * canvas.width,
				Math.random() * canvas.height
			);
			context.lineTo(
				Math.random() * canvas.width,
				Math.random() * canvas.height
			);
		}
		context.stroke();

		context.fillText(newCaptchaText, 10, 35);
	}

	function inputHandler(event) {
		setInputCaptcha(event.target.value);
	}

	function validateCaptcha() {
		if (inputCaptcha === captchaText) {
			setcaptchaResult(true);
		} else {
			generateCaptcha();
		}
	}

	useEffect(() => {
		let ignore = false;

		if (!ignore) generateCaptcha();
		return () => {
			ignore = true;
		};
	}, []);

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className="captcha">
					<canvas id="captchaCanvas" width="150" height="50"></canvas>
					<button type="button" onClick={generateCaptcha}>
						Refresh CAPTCHA
					</button>
					<label for="captchaInput">
						Enter the text from the image:
					</label>
					<input
						type="text"
						id="captchaInput"
						name="captchaInput"
						value={inputCaptcha}
						onChange={inputHandler}
						required
					/>
					<button onClick={validateCaptcha}>Check</button>
				</div>
				<div className="captchaResult">
					{captchaResult ? (
						<>
							<div className="passou">OK</div>
						</>
					) : (
						<>
							<div className="naoPassou">NOK</div>
						</>
					)}
				</div>
				<h1>{inputCaptcha}</h1>
				<h2>{captchaText}</h2>
			</main>
		</div>
	);
}
