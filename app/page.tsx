"use client";
import { Button } from "@/components/ui/button";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT as string;
const authenticator = async () => {
	try {
		const response = await fetch("http://localhost:3000/api/auth");

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Request failed with status ${response.status}: ${errorText}`
			);
		}

		const data = await response.json();
		const { signature, expire, token } = data;
		return { signature, expire, token };
	} catch (error: any) {
		throw new Error(`Authentication request failed: ${error.message}`);
	}
};

const onError = (err: any) => {
	console.log("Error", err);
};

const onSuccess = (res: IKUploadResponse) => {
	console.log("Success", res);
};
export default function Home() {
	return (
		<div>
			<Button>Upload</Button>

			<ImageKitProvider
				publicKey={publicKey}
				urlEndpoint={urlEndpoint}
				authenticator={authenticator}
			>
				<IKImage
					path="Expanding-Brain.jpg"
					width={400}
					height={400}
					alt="Alt text"
				/>
				<div>
					<h2>File upload</h2>
					<IKUpload
						fileName="test-upload.png"
						onError={onError}
						onSuccess={onSuccess}
					/>
				</div>
			</ImageKitProvider>
		</div>
	);
}
