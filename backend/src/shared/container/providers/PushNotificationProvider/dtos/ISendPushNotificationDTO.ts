export default interface ISendPushNotificationDTO {
  include_external_user_ids?: string[];
  headings: IContent;
  contents: IContent;
  app_id: string;
  key_id: string;
  included_segments?: string;
  send_after?: string;
  channel_for_external_user_ids?: string;
  colapse_id?: string;
}

interface IContent {
  en?: string;
}
