/* Default website list.
 *
 * This list is intended to be a list of common services to be
 * used as the default configuration for new users. If you
 * think a service should be here and isn't, please send send
 * a patch or open a PR.
 */

const defaultItems = [
	{
		regex: "https://pim.etesync.com/*\nhttps://client.etesync.com/*",
		pubkey: `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=8UUi
-----END PGP PUBLIC KEY BLOCK-----`
	},
];

export default defaultItems;
