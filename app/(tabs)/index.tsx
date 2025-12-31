import { router } from 'expo-router';
import {
	CheckCircle,
	Shield
} from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { displayFBPosts } from '../utils/fb.js';
import { displayInstaReels } from '../utils/insta.js';
import { displayTwitterFeed } from '../utils/tweet.js';
import SocialMediaAggregator from './smca';

export const posts = [
    {
      id: 1,
      platform: 'Twitter',
      username: '@marketingpro',
      handle: 'MarketingPro',
      content: 'Just launched our new campaign targeting Gen Z demographics. Early results show 42% engagement increase!',
      timestamp: '2 hours ago',
      likes: 245,
      comments: 32,
      shares: 18,
      image: 'https://images.unsplash.com/photo-1613759612065-d5971d32ca49?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWFya2V0aW5nJTIwYnJhbmRpbmd8ZW58MHx8MHx8fDA%3D',
      metrics: {
        reach: '12.4K',
        engagement: '3.2K',
        sentiment: '+12%'
      }
    },
    {
      id: 2,
      platform: 'LinkedIn',
      username: '@executiveinsights',
      handle: 'BusinessExecutive',
      content: '5 key leadership skills every manager needs in 2023. Communication, adaptability, and emotional intelligence topped the list in our recent survey.',
      timestamp: '4 hours ago',
      likes: 189,
      comments: 24,
      shares: 42,
      image: 'https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEJ1c2luZXNzd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBleGVjdXRpdmV8ZW58MHx8MHx8fDA%3D',
      metrics: {
        reach: '8.7K',
        engagement: '2.1K',
        sentiment: '+8%'
      }
    },
    {
      id: 3,
      platform: 'Instagram',
      username: '@techguru',
      handle: 'TechInfluencer',
      content: 'Behind the scenes of our latest product launch. The team worked tirelessly to bring this innovation to life!',
      timestamp: '6 hours ago',
      likes: 1242,
      comments: 87,
      shares: 56,
      image: 'https://images.unsplash.com/photo-1480694313141-fce5e697ee25?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
      metrics: {
        reach: '45.2K',
        engagement: '12.8K',
        sentiment: '+24%'
      }
    },
    {
      id: 4,
      platform: 'Facebook',
      username: '@brandcentral',
      handle: 'BrandCentral',
      content: 'Customer satisfaction survey results are in! We\'re thrilled to announce a 94% satisfaction rate this quarter.',
      timestamp: '1 day ago',
      likes: 587,
      comments: 43,
      shares: 29,
      image: 'https://images.unsplash.com/photo-1584254520678-31fe4dce5306?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCUyMkRhdGElMjBhbmFseXRpY3MlMjBkYXNoYm9hcmR8ZW58MHx8MHx8fDA%3D',
      metrics: {
        reach: '22.1K',
        engagement: '6.4K',
        sentiment: '+18%'
      }
    }
  ];

const fbPost = async (email) => {
	let feed = await displayFBPosts(email);
	posts.push(...feed);
	//alert('post in login tsx' + posts);
	console.log("Feed in login.tsx (after facebook) =", posts);
}

const twitterPost = async (password) => {
	let feed = await displayTwitterFeed(password);
	posts.push(...feed);
	console.log("Feed in login.tsx (after twitter) =", posts);
}

const instaReels = async(instaToken) => {
	let feed = await displayInstaReels(instaToken);
	posts.push(...feed);
	console.log("Feed in login.tsx (after instagram) =", posts);
}

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [instaToken, setInstaToken] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [loginSuccess, setLoginSuccess] = useState(false); 
	const [isVisible, setIsVisible] = useState(false);
	const fetchPosts  = async (email,password,instaToken) => {
		console.log("InstaToken in fetch posts function =", instaToken);
		await fbPost(email);
		await twitterPost(password);
		await instaReels(instaToken);
		setIsVisible(!isVisible);
	}
	const handleFacebookLogin = async () => {
		setIsLoading(true);
		// Simulate Facebook OAuth process
		setTimeout(() => {
			setIsLoading(false);
			setLoginSuccess(true);
			// Navigate to main feed after success animation
			setTimeout(() => {
				router.replace('/');
			}, 1500);
		}, 2000);
	};
	const handleEmailLogin = () => {
		if (!email || !password) {
			Alert.alert('Error', 'Please enter both email and password');
			return;
		}
		setIsLoading(true);
		// Simulate login process
		setTimeout(() => {
			setIsLoading(false);
			setLoginSuccess(true);
		// Navigate to main feed after success animation
			setTimeout(() => {
				router.replace('/');
			}, 1500);
		}, 1500);
	};

	if (loginSuccess) {
		return (
			<View className="flex-1 bg-white items-center justify-center px-6">
				<CheckCircle size={80} color="#10B981" />
				<Text className="text-2xl font-bold text-gray-900 mt-6">Login Successful!</Text>
				<Text className="text-gray-600 mt-2 text-center">
					Redirecting to your dashboard...
				</Text>
			</View>
		);
	}

	return (
		<>
		{
			isVisible ? (<SocialMediaAggregator />) : 
			(
				<View className="flex-1 bg-white">

					{/* Illustration */}
					<View className="items-center mb-8">
						<Image source={{ uri: 'https://images.unsplash.com/photo-1546572797-e8c933a75a1f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QnVzaW5lc3NtYW4lMjBwcm9mZXNzaW9uYWwlMjBleGVjdXRpdmV8ZW58MHx8MHx8fDA%3D' }} 
						className="w-64 h-32 rounded-2xl"
						resizeMode="cover"
						/>
					</View>
					
					<View className="px-6 mb-8 items-center">
						<View className="bg-blue-50 px-8 py-4 rounded-3xl border border-blue-100 shadow-sm">
							<Text className="text-3xl font-black text-blue-700 text-center uppercase tracking-widest">
								Social Media
							</Text>
							<Text className="text-3xl font-black text-blue-700 text-center uppercase tracking-widest">
								Aggregator
							</Text>
							<View className="mt-2 h-1 w-12 bg-blue-600 self-center rounded-full" />
						</View>
					</View>

					{/* Login Form */}
					<View className="px-6">
						
						{/* Email Input */}
						<View className="mb-4">
							<View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
								
								<TextInput 
									placeholder="Facebook Token" 
									className="ml-3 flex-1 text-gray-900"
									value={email}
									onChangeText={setEmail}
									keyboardType="email-address"
									autoCapitalize="none"
								/>
							</View>
						</View>

						{/* Password Input */}
						<View className="mb-6">
							<View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">

								<TextInput 
									placeholder="Twitter Token" 
									className="ml-3 flex-1 text-gray-900"
									secureTextEntry={!showPassword}
									value={password}
									onChangeText={setPassword}
									autoCapitalize="none"
								/>
							</View>
						</View>

						{/* Instagram Token Input */}
						<View className="mb-4">
							<View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
								
								<TextInput 
									placeholder="Instagram Token" 
									className="ml-3 flex-1 text-gray-900"
									value={instaToken}
									onChangeText={setInstaToken}
									keyboardType="email-address"
									autoCapitalize="none"
								/>
							</View>
							{console.log("Insta token typed in =", instaToken)}
						</View>

						{/* Login Button */}
						<TouchableOpacity 
							className="bg-blue-600 rounded-xl py-4 mb-4 items-center justify-center"
							title={isVisible ? "Hide Component" : "Show Component"}
							onPress={() => fetchPosts(email,password,instaToken)}
							disabled={isLoading}
						>
							{
								isLoading ?
								(<ActivityIndicator color="white" />) : 
								(<Text className="text-white font-bold text-lg ">View feed</Text>)
							}
							{/*isVisible && <SocialMediaAggregator />*/}
						</TouchableOpacity>
	
						{/* Security Notice */}
						<View className="flex-row items-start mb-6">
							<Shield size={16} color="#6B7280" className="mt-1" />
							<Text className="text-gray-600 ml-2 text-sm">
								We don't store any data . Pl look at the demo.txt file to find out how to generate tokens using your facebook and twitter accounts.  
							</Text>
						</View>
					</View>
				</View>
			)
		}
		</>
	);
};

export default LoginScreen;