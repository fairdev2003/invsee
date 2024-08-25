"use client";

import { sections } from "./(stores)/types/dashboardTypes";
import { PermissionLevel } from "@/lib/types/userTypes";
import type { DashboardTag } from "./(stores)/types/dashboardTypes";

export type ReturnTypePermissions = {
  tag: string | boolean
  returnType: string
  args: PermissionLevel[]
}

export class Auth {
  state: DashboardTag;
  permissions: PermissionLevel[];
  private permissionNeeded: PermissionLevel[] = [];
  private tags: string[] = sections.map((s) => s.tag);

  constructor(state: DashboardTag, permissions: PermissionLevel[]) {
    this.state = state;
    this.permissions = permissions;
  }

  handleNormalSection() {

    console.log(this.tags);

    return this.state
  }

  checkPermission(section: string, permissions: PermissionLevel[]) {
    if (!section) return false;
    
    for (const permission of permissions) {
      if (this.permissionNeeded.includes(permission)) {
        permissions.push(permission);
      }
    }
    
    const dashboard_tag = permissions.includes(
      sections.filter((s) => s.tag === section)[0]?.accessLevel
    );

    const tag = this.tags.includes(section) ? dashboard_tag : "dashboard_auth_error";

    return tag
  }

  handleAbstractSection() {
    return "dashboard_auth_error"
  }
}


