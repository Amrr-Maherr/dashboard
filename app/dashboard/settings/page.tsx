"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ProtectedRoute } from "@/Providers/ProtectedRoute";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableHeaderSection } from "@/components/ui/table-header-section";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="floating" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <TableHeaderSection
                  title="Settings"
                  description="Manage your application settings"
                />

                <div className="grid gap-6">
                  {/* Profile Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>
                        Update your personal information and preferences.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="Enter first name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Enter last name" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="Enter phone number" />
                      </div>
                      <Button>Save Profile</Button>
                    </CardContent>
                  </Card>

                  {/* Notification Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>
                        Configure how you receive notifications.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </p>
                        </div>
                        <Checkbox />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications in browser
                          </p>
                        </div>
                        <Checkbox />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via SMS
                          </p>
                        </div>
                        <Checkbox />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your account security and privacy.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" placeholder="Enter current password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" placeholder="Enter new password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                      </div>
                      <Button>Change Password</Button>
                    </CardContent>
                  </Card>

                  {/* Application Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Settings</CardTitle>
                      <CardDescription>
                        Configure application-wide settings.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable dark theme
                          </p>
                        </div>
                        <Checkbox />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Auto Save</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically save changes
                          </p>
                        </div>
                        <Checkbox />
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ar">العربية</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
