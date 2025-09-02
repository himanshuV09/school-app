'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, School, MapPin, Mail, Phone, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load schools from localStorage (in real app, this would be from Supabase)
    const loadSchools = () => {
      try {
        const savedSchools = localStorage.getItem('schools');
        if (savedSchools) {
          setSchools(JSON.parse(savedSchools));
        } else {
          // Demo data for initial display
          const demoSchools = [
            {
              id: 1,
              name: "Greenwood High School",
              address: "123 Education Lane, Academic District",
              city: "Mumbai",
              state: "Maharashtra",
              contact: "9876543210",
              email_id: "info@greenwood.edu",
              image: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=500"
            },
            {
              id: 2,
              name: "Sunrise International School",
              address: "456 Knowledge Street, Learning Hub",
              city: "Bangalore",
              state: "Karnataka",
              contact: "9876543211",
              email_id: "contact@sunrise.edu",
              image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=500"
            },
            {
              id: 3,
              name: "Blue Valley Academy",
              address: "789 Wisdom Avenue, Scholar's Quarter",
              city: "Chennai",
              state: "Tamil Nadu",
              contact: "9876543212",
              email_id: "admin@bluevalley.edu",
              image: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=500"
            }
          ];
          setSchools(demoSchools);
          localStorage.setItem('schools', JSON.stringify(demoSchools));
        }
      } catch (error) {
        console.error('Error loading schools:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSchools();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading schools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="flex items-center space-x-2">
                <School className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">All Schools</h1>
              </div>
            </div>
            <Link href="/add-school">
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add School</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Discover Schools
          </h2>
          <p className="text-gray-600">
            Browse through our comprehensive database of educational institutions
          </p>
          <div className="mt-4">
            <Badge variant="secondary" className="text-sm">
              {schools.length} {schools.length === 1 ? 'School' : 'Schools'} Found
            </Badge>
          </div>
        </div>

        {schools.length === 0 ? (
          <div className="text-center py-16">
            <School className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Schools Found</h3>
            <p className="text-gray-600 mb-6">Get started by adding the first school to your database</p>
            <Link href="/add-school">
              <Button>Add First School</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school) => (
              <Card
                key={school.id}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {school.name}
                  </CardTitle>
                  <CardDescription className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      {school.address}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Location:</span>
                      <span className="text-sm text-gray-900">{school.city}, {school.state}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{school.contact}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{school.email_id}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-all"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}