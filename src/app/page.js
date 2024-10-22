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
		context.clearRect(0, 0, canvas.width, canvas.height);

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
		context.strokeStyle = getRandomColor();
		context.stroke();

		for (let i = 0; i < newCaptchaText.length; i++) {
			context.font = `${Math.random() * 20 + 20}px Arial`;
			let angle = Math.random() * 0.4 - 0.2;
			context.save();
			context.translate(0 + i * 25, 35);
			context.rotate(angle);
			context.fillStyle = "#000";
			context.fillText(newCaptchaText[i], 5, -5);
			context.restore();
		}
	}

	function inputHandler(event) {
		setInputCaptcha(event.target.value);
	}

	function validateCaptcha() {
		if (inputCaptcha === captchaText) {
			setcaptchaResult(true);
		} else {
			generateCaptcha();
			setInputCaptcha("");
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
					{captchaResult ? (
						<>
							<div className="passou">OK</div>
						</>
					) : (
						<>
							<div className="captchaImg">
								<canvas
									id="captchaCanvas"
									width="150"
									height="50"
								></canvas>
								<button type="button" onClick={generateCaptcha}>
									Refresh
								</button>
							</div>
							<div className="captchaInteraction">
								<label for="captchaInput">
									Insira o texto da imagem:
								</label>
								<div className="inputAndButton">
									<input
										type="text"
										id="captchaInput"
										name="captchaInput"
										value={inputCaptcha}
										onChange={inputHandler}
										required
									/>
									<button onClick={validateCaptcha}>
										Check
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</main>
		</div>
	);
}
