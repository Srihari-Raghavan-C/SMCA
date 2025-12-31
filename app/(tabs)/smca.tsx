import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { 
  Search, 
  Bell, 
  BarChart3, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  TrendingUp,
  Calendar,
  Eye
} from 'lucide-react-native';
import "../../global.css"
import { posts } from './index';

const SocialMediaAggregator = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleBookmark = (id: number) => {
    if (bookmarkedPosts.includes(id)) {
      setBookmarkedPosts(bookmarkedPosts.filter(postId => postId !== id));
    } else {
      setBookmarkedPosts([...bookmarkedPosts, id]);
    }
  };

  const toggleLike = (id: number) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(postId => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };
  
  return (
    <View className="flex-1 bg-gray-50">
		{/* Header */}
		<View className="bg-white shadow-sm px-4 pt-12 pb-4">
			<View className="flex-row items-center justify-between mb-4">
			<Text className="text-2xl font-bold text-gray-900">ContentHub</Text>
			<View className="flex-row items-center">
				<TouchableOpacity className="mr-4">
					<Bell size={24} color="#4B5563" />
				</TouchableOpacity>
				<TouchableOpacity>
					<BarChart3 size={24} color="#4B5563" />
				</TouchableOpacity>
			</View>
        </View>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3 mb-4">
			<Search size={20} color="#9CA3AF" />
			<Text className="ml-2 text-gray-500 flex-1">Search content, hashtags, or accounts</Text>
        </View>
        
        {/* Tabs */}
        <View className="flex-row justify-around">
			<TouchableOpacity 
            className={`pb-2 px-4 ${activeTab === 'feed' ? 'border-b-2 border-blue-600' : ''}`}
            onPress={() => setActiveTab('feed')}
			>
				<Text className={`font-medium ${activeTab === 'feed' ? 'text-blue-600' : 'text-gray-500'}`}>Feed</Text>
			</TouchableOpacity>
			<TouchableOpacity 
            className={`pb-2 px-4 ${activeTab === 'analytics' ? 'border-b-2 border-blue-600' : ''}`}
            onPress={() => {setActiveTab('analytics');}}
			>
				<Text className={`font-medium ${activeTab === 'analytics' ? 'text-blue-600' : 'text-gray-500'}`}>Analytics</Text>
			</TouchableOpacity>
			<TouchableOpacity 
            className={`pb-2 px-4 ${activeTab === 'bookmarks' ? 'border-b-2 border-blue-600' : ''}`}
            onPress={() => setActiveTab('bookmarks')}
			>
				<Text className={`font-medium ${activeTab === 'bookmarks' ? 'text-blue-600' : 'text-gray-500'}`}>Bookmarks</Text>
			</TouchableOpacity>
        </View>
    </View>
      
    {/* Content */}
    <ScrollView className="flex-1 px-4 py-4">
        {
			//console.log("Calling fbPost"),
			//fbPost(),
			posts.map((post) => (
			console.log("Rendering post =", post),
			<View key={post.id} className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
				{/* Post Header */}
				<View className="flex-row items-center p-4">
					<View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
						<Text className="font-bold text-blue-800">
						  {post.platform.charAt(0)}
						</Text>
					</View>
					<View className="ml-3 flex-1">
						<View className="flex-row items-center">
							<Text className="font-semibold text-gray-900">{post.handle}</Text>
								{post.platform === 'Twitter' && (
									<Text className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
										{post.platform}
									</Text>
								)}
								{post.platform === 'LinkedIn' && (
									<Text className="ml-2 text-xs bg-blue-800 text-white px-2 py-1 rounded-full">
										{post.platform}
									</Text>
								)}
								{post.platform === 'Instagram' && (
									<Text className="ml-2 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">
										{post.platform}
									</Text>
								)}
								{post.platform === 'Facebook' && (
									<Text className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
										{post.platform}
									</Text>
								)}
						</View>
						<Text className="text-gray-500 text-sm">{post.username} • {post.timestamp}</Text>
					</View>
					<TouchableOpacity onPress={() => toggleBookmark(post.id)}>
						<Bookmark 
						  size={20} 
						  color={bookmarkedPosts.includes(post.id) ? "#3B82F6" : "#9CA3AF"} 
						  fill={bookmarkedPosts.includes(post.id) ? "#3B82F6" : "none"} 
						/>
					</TouchableOpacity>
				</View>
            
				{/* Post Content */}
				<Text className="px-4 text-gray-800 mb-3">{post.content}</Text>
				
				{/* Post Image */}
				{post.image && (
				  <Image 
					source={{ uri: post.image }} 
					className="w-full h-48"
					resizeMode="cover"
				  />
				)}
				
				{/* Metrics */}
				<View className="flex-row justify-around py-3 border-b border-gray-100">
					<View className="items-center">
						<Eye size={18} color="#6B7280" />
						<Text className="text-xs text-gray-600 mt-1">{post.metrics.reach}</Text>
						<Text className="text-xs text-gray-500">Reach</Text>
					</View>
					<View className="items-center">
						<TrendingUp size={18} color="#10B981" />
						<Text className="text-xs text-gray-600 mt-1">{post.metrics.engagement}</Text>
						<Text className="text-xs text-gray-500">Engagement</Text>
					</View>
					<View className="items-center">
						<Heart size={18} color="#EF4444" />
						<Text className="text-xs text-gray-600 mt-1">{post.metrics.sentiment}</Text>
						<Text className="text-xs text-gray-500">Sentiment</Text>
					</View>
					<View className="items-center">
						<Calendar size={18} color="#8B5CF6" />
						<Text className="text-xs text-gray-600 mt-1">24h</Text>
						<Text className="text-xs text-gray-500">Avg. Time</Text>
					</View>
				</View>
				
				{/* Actions */}
				<View className="flex-row justify-around py-3">
					<TouchableOpacity 
						className="flex-row items-center"
						onPress={() => toggleLike(post.id)}
					>
						<Heart 
							size={20} 
							color={likedPosts.includes(post.id) ? "#EF4444" : "#6B7280"} 
							fill={likedPosts.includes(post.id) ? "#EF4444" : "none"} 
						/>
						<Text className="ml-2 text-gray-600">{post.likes}</Text>
					</TouchableOpacity>
					<TouchableOpacity className="flex-row items-center">
						<MessageCircle size={20} color="#6B7280" />
						<Text className="ml-2 text-gray-600">{post.comments}</Text>
					</TouchableOpacity>
					<TouchableOpacity className="flex-row items-center">
						<Share2 size={20} color="#6B7280" />
						<Text className="ml-2 text-gray-600">{post.shares}</Text>
					</TouchableOpacity>
				</View>
			</View>
        ))}
    </ScrollView>
</View>	
  );
};

export  default SocialMediaAggregator;