// DataPoster.tsx
import axios from "axios";
import { useState } from "react";

interface KeyValue {
	key: string;
	value: string;
}

const DataPoster: React.FC = () => {
	const [inputs, setInputs] = useState<KeyValue[]>([]); // Array to store key-value pairs
	const [response, setResponse] = useState<string | null>(null);

	const handleKeyInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		const newInputs = [...inputs];
		newInputs[index].key = event.target.value;
		setInputs(newInputs);
	};

	const handleValueInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		const newInputs = [...inputs];
		newInputs[index].value = event.target.value;
		setInputs(newInputs);
	};

	const handleAddInput = () => {
		setInputs([...inputs, { key: "", value: "" }]);
	};

	const handleRemoveInput = (index: number) => {
		const newInputs = [...inputs];
		newInputs.splice(index, 1);
		setInputs(newInputs);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const finalData = inputs.reduce((acc, curr) => {
			acc[curr.key] = curr.value;
			return acc;
		}, {} as Record<string, string>); // Initialize accumulator as empty object

		try {
            console.log('finalData', finalData)
			const response = await axios.post("https://b7xj1i3tki.execute-api.us-east-1.amazonaws.com/update-s3", { payload: finalData});
			setResponse('Data has been successfully uploaded to S3');
		} catch (error) {
			console.error("Error posting data:", error);
			setResponse("Error posting data");
		}
	};

	return (
		<div className="p-4 bg-gray-100 rounded-lg shadow-md">
			{/* Container styles */}
			<h2 className="text-xl font-bold mb-4">Post Data</h2>
			<form onSubmit={handleSubmit}>
				{inputs.map((input, index) => (
					<div key={index} className="flex mb-2">
						<label htmlFor={`key-${index}`} className="mr-2 block text-sm font-medium text-gray-700">
							Key:
						</label>
						<input
							type="text"
							id={`key-${index}`}
							value={input.key}
							onChange={(e) => handleKeyInputChange(index, e)}
							className="flex-grow px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
						<label htmlFor={`value-${index}`} className="ml-4 block text-sm font-medium text-gray-700">
							Value:
						</label>
						<input
							type="text"
							id={`value-${index}`}
							value={input.value}
							onChange={(e) => handleValueInputChange(index, e)}
							className="flex-grow px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
						{index > 0 && (
							<button type="button" onClick={() => handleRemoveInput(index)} className="ml-4 text-red-500">
								Remove
							</button>
						)}
					</div>
				))}
				<button
					type="button"
					onClick={handleAddInput}
					className="mt-4 mr-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Add Key-Value Pair
				</button>
				<button
					type="submit"
					className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
				>
					Submit
				</button>
			</form>
			{response && <p>Response: {response}</p>}
		</div>
	);
};

export default DataPoster;
