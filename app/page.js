import Link from 'next/link';
import { School, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <School className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">School-App</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/add-school">
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add School</span>
                </Button>
              </Link>
              <Link href="/schools">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>View Schools</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            School Management System
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Efficiently manage school information with our comprehensive platform. 
            Add new schools and browse through our extensive database.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <Link href="/add-school">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit group-hover:bg-blue-200 transition-colors">
                  <Plus className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Add New School</CardTitle>
                <CardDescription className="text-base">
                  Register a new school with complete details including contact information and images
                </CardDescription>
              </CardHeader>
              
            </Link>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <Link href="/schools">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit group-hover:bg-green-200 transition-colors">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Browse Schools</CardTitle>
                <CardDescription className="text-base">
                  Explore our comprehensive database of schools with detailed information
                </CardDescription>
              </CardHeader>
            
            </Link>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Platform Features
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="mx-auto mb-4 p-2 bg-purple-100 rounded-full w-fit">
                <School className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Comprehensive Database</h4>
              <p className="text-sm text-gray-600">Store complete school information with images and contact details</p>
            </div>
            <div className="text-center p-6">
              <div className="mx-auto mb-4 p-2 bg-orange-100 rounded-full w-fit">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold mb-2">Easy Management</h4>
              <p className="text-sm text-gray-600">Intuitive interface for adding and viewing school information</p>
            </div>
            <div className="text-center p-6">
              <div className="mx-auto mb-4 p-2 bg-teal-100 rounded-full w-fit">
                <Plus className="h-6 w-6 text-teal-600" />
              </div>
              <h4 className="font-semibold mb-2">Responsive Design</h4>
              <p className="text-sm text-gray-600">Works seamlessly on all devices - desktop, tablet, and mobile</p>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}