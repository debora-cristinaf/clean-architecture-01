import { NotificationErrorProps } from "./Notification";

export default class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(
      errors.map((error) => `${error.context}: ${error.message}`).join(",")
    );
  }
}
