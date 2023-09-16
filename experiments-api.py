import json
import aiohttp
import logging

import typing


class ExperimentSession:
    r"""
    Represents an Experiments session using aiohttp.
    """
    def __init__(self, *, session: typing.Optional[aiohttp.ClientSession] = None, **kwargs) -> None:
        self.session: typing.Optional[aiohttp.ClientSession] = session or aiohttp.ClientSession
        self.loads = lambda dict_: json.loads(dict_)
        self._logger: logging.Logger = kwargs.pop("logger", logging.Logger("experiments"))
        self._git: str = "https://raw.githubusercontent.com/discordexperimenthub/assyst-tags/main/experiment-rollout/data.json"

    async def get_experiments(self) -> (typing.Optional[typing.Dict[Any, Any]]):
        r"""|coro|

        Makes a request to the raw JSON of Discord Experiments github.
        
        If it fails to do so, it will log in the therminal and return None, else
        it will return the dict of the response.
        """

        async with self.session as session:
            async with session.get(self._git, allow_redirects=True) as response:
                if response.status == 200:
                    raw_content: str = await response.text()

                    try:
                        json_data: typing.Union[typing.Dict[typing.Any, typing.Any], typing.Any] = self.loads(raw_content)
                        return json_data

                    except json.JSONDecodeError as e:
                        previous_name: str = self._logger.name

                        self._logger.name = self._logger.name + ".get_experiments"
                        self._logger.warning(
                            "Failed to convert 'raw_content' (of type '{}') into a JSON".format(raw_content.__class__.__name__)
                        )

                        self._logger.error(e.with_traceback())

                        self._logger.name = previous_name
                        return None
                else:
                    previous_name: str = self._logger.name

                    self._logger.name = self._logger.name + ".get_experiments"
                    self._logger.critical(
                        "Response status wasn't the expected, expected '200' and got '{}'".format(response.status)
                    )

                    self._logger.name = previous_name

                    return None
    @staticmethod
    async def format_json(payload: typing.Dict[typing.Union[str, typing.Any], typing.Union[dict, list, typing.Any]], **kwargs) -> typing.Dict[str, typing.Any]:
        r"""|coro|

        Formats the provided json to have only the key, value pairs specified as true,
        by default all experiments are set to False.

        Kwargs
        ------
        clyde: :cls:`bool`
            Whether to show Clyde AI experiment in returning JSON.

        split_permissions: :cls:`bool`
            Whether to show Split Permissions experiment in returning JSON.

        channel_summaries: :cls:`bool`
            Whether to show Channel Summaries experiment in returning JSON.

        pomelo: :cls:`bool`
            Whether to show Pomelo experiment in returning JSON.

        color_together: :cls:`bool`
            Whether to show Color Together experiment in returning JSON.

        server_guide: :cls:`bool`
            Whether to show Server Guide experiment in returning JSON.

        markdown_server: :cls:`bool`
            Whether to show Markdown Server experiment in returning JSON.

        pronouns: :cls:`bool`
            Whether to show Pronouns experiment in returning JSON.

        clyde_dm: :cls:`bool`
            Whether to show Clyde DM experiment in returning JSON.

        channel_emojis: :cls:`bool`
            Whether to show Channel Emojis experiment in returning JSON.

        media_channels: :cls:`bool`
            Whether to show Media Channels experiment in returning JSON.

        remove_reactions_by_emoji: :cls:`bool`
            Whether to show Remove Reactions By Emoji experiment in returning JSON.

        lockdown_mode: :cls:`bool`
            Whether to show Lockdown Mode experiment in returning JSON.

        member_safety_tab: :cls:`bool`
            Whether to show Member Safety Tab experiment in returning JSON.

        guest_invites: :cls:`bool`
            Whether to show Guest Invites experiment in returning JSON.

        clyde_personality: :cls:`bool`
            Whether to show Clyde Personality experiment in returning JSON.

        clyde_gdm: :cls:`bool`
            Whether to show Clyde GDM experiment in returning JSON.

        markdown_user: :cls:`bool`
            Whether to show Markdown User experiment in returning JSON.

        automod_usernames: :cls:`bool`
            Whether to show Automod Usernames experiment in returning JSON.

        voice_channel_topics: :cls:`bool`
            Whether to show Voice Channel Topics experiment in returning JSON.

        reply_welcome_messages: :cls:`bool`
            Whether to show Reply Welcome Messages experiment in returning JSON.

        domain_connection: :cls:`bool`
            Whether to show Domain Connection experiment in returning JSON.

        profile_effects: :cls:`bool`
            Whether to show Profile Effects experiment in returning JSON.

        tabs_v2: :cls:`bool`
            Whether to show Tabs V2 experiment in returning JSON.

        improved_bans_tab: :cls:`bool`
            Whether to show Improved Bans Tab experiment in returning JSON.

        server_products: :cls:`bool`
            Whether to show Server Products experiment in returning JSON.
        """

        F: bool = False

        clyde: bool = kwargs.pop("clyde", F)
        split_permissions: bool = kwargs.pop("split_permissions", F)
        channel_summaries: bool = kwargs.pop("channel_summaries", F)
        pomelo: bool = kwargs.pop("pomelo", F)
        color_together: bool = kwargs.pop("color_together", F)
        server_guide: bool = kwargs.pop("server_guide", F)
        markdown_server: bool = kwargs.pop("markdown_server", F)
        pronouns: bool = kwargs.pop("pronouns", F)
        clyde_dm: bool = kwargs.pop("clyde_dm", F)
        channel_emojis: bool = kwargs.pop("channel_emojis", F)
        media_channels: bool = kwargs.pop("media_channels", F)
        remove_reactions_by_emoji: bool = kwargs.pop("remove_reactions_by_emoji", F)
        lockdown_mode: bool = kwargs.pop("lockdown_mode", F)
        member_safety_tab: bool = kwargs.pop("member_safety_tab", F)
        guest_invites: bool = kwargs.pop("guest_invites", F)
        clyde_personality: bool = kwargs.pop("clyde_personality", F)
        clyde_gdm: bool = kwargs.pop("clyde_gdm", F)
        markdown_user: bool = kwargs.pop("markdown_user", F)
        automod_usernames: bool = kwargs.pop("automod_usernames", F)
        voice_channel_topics: bool = kwargs.pop("voice_channel_topics", F)
        reply_welcome_messages: bool = kwargs.pop("reply_welcome_messages", F)
        domain_connection: bool = kwargs.pop("domain_connection", F)
        profile_effects: bool = kwargs.pop("profile_effects", F)
        tabs_v2: bool = kwargs.pop("tabs_v2", F)
        improved_bans_tab: bool = kwargs.pop("improved_bans_tab", F)
        server_products: bool = kwargs.pop("server_products", F)

        rjson: dict[str, Any] = {}

        for experiment, _ in payload.items():
            if clyde and experiment == "clyde":
                rjson[experiment] = _

            if split_permissions and experiment == "split_permissions":
                rjson[experiment] = _

            if channel_summaries and experiment == "channel_summaries":
                rjson[experiment] = _

            if pomelo and experiment == "pomelo":
                rjson[experiment] = _

            if color_together and experiment == "color_together":
                rjson[experiment] = _

            if server_guide and experiment == "server_guide":
                rjson[experiment] = _

            if markdown_server and experiment == "markdown_server":
                rjson[experiment] = _

            if pronouns and experiment == "pronouns":
                rjson[experiment] = _

            if clyde_dm and experiment == "clyde_dm":
                rjson[experiment] = _

            if channel_emojis and experiment == "channel_emojis":
                rjson[experiment] = _

            if media_channels and experiment == "media_channels":
                rjson[experiment] = _

            if remove_reactions_by_emoji and experiment == "remove_reactions_by_emoji":
                rjson[experiment] = _

            if lockdown_mode and experiment == "lockdown_mode":
                rjson[experiment] = _

            if member_safety_tab and experiment == "member_safety_tab":
                rjson[experiment] = _

            if guest_invites and experiment == "guest_invites":
                rjson[experiment] = _

            if clyde_personality and experiment == "clyde_personality":
                rjson[experiment] = _

            if clyde_gdm and experiment == "clyde_gdm":
                rjson[experiment] = _

            if markdown_user and experiment == "markdown_user":
                rjson[experiment] = _

            if automod_usernames and experiment == "automod_usernames":
                rjson[experiment] = _

            if voice_channel_topics and experiment == "voice_channel_topics":
                rjson[experiment] = _

            if reply_welcome_messages and experiment == "reply_welcome_messages":
                rjson[experiment] = _

            if domain_connection and experiment == "domain_connection":
                rjson[experiment] = _

            if profile_effects and experiment == "profile_effects":
                rjson[experiment] = _

            if tabs_v2 and experiment == "tabs_v2":
                rjson[experiment] = _

            if improved_bans_tab and experiment == "improved_bans_tab":
                rjson[experiment] = _

            if server_products and experiment == "server_products":
                rjson[experiment] = _

        return rjson
