"use client";

import { sections } from "./(stores)/types/dashboardTypes";
import { PermissionLevel } from "@/lib/types/userTypes";
import type { DashboardTag } from "./(stores)/types/dashboardTypes";

export class Auth {
  state: DashboardTag;
  permissions: PermissionLevel[];
  private tags: string[] = sections.map((s) => s.tag);

  constructor(state: DashboardTag, permissions: PermissionLevel[]) {
    this.state = state;
    this.permissions = permissions;
  }

  handleNormalSection() {

    console.log(this.tags);

    return this.state;
  }

  checkPermission(section: string, permissions: PermissionLevel[]) {
    if (!section) return false;

    return permissions.includes(
      sections.filter((s) => s.tag === section)[0].accessLevel
    );
  }

  handleAbstractSection(permissions: PermissionLevel[]) {
    return "dashboard_auth_error";
  }
}


